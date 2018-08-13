package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.advanced.core.data.OutlinerRepository;
import outliner.domain.L3Cell;


/**
 * Spring Data  repository for the L3Cell entity.
 */

@Repository
public interface L3CellRepository extends OutlinerRepository<L3Cell, Long> {

}
