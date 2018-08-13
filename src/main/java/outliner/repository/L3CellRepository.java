package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.domain.L3Cell;
import outliner.persistence.CustomRepository;


/**
 * Spring Data  repository for the L3Cell entity.
 */

@Repository
public interface L3CellRepository extends CustomRepository<L3Cell, Long> {

}
