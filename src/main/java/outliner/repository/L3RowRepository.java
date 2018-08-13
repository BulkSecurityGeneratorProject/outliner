package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.advanced.core.data.OutlinerRepository;
import outliner.domain.L3Row;


/**
 * Spring Data  repository for the L3Row entity.
 */
@Repository
public interface L3RowRepository extends OutlinerRepository<L3Row, Long> {

}
